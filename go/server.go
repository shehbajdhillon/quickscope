package main

import (
	"log"
	"net/http"
	"os"
	"quickscopedev/auth"
	"quickscopedev/database"
	"quickscopedev/graph"
	"quickscopedev/logger"
	"quickscopedev/webhooks"

	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/go-chi/chi/v5"
	"github.com/joho/godotenv"
	"github.com/rs/cors"
)

const defaultPort = "8080"

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}
	godotenv.Load()

	production := os.Getenv("PRODUCTION") != ""
	Logger := logger.Connect(production)
	Database := database.Connect(database.DatabaseConnectProps{Logger: Logger})
	Webhooks := webhooks.Connect(webhooks.WebhookMiddlewareConnectProps{
		Logger:   Logger,
		Database: Database,
	})

	srv := graph.Connnect(graph.GraphConnectProps{Logger: Logger, Queries: Database})

	router := chi.NewRouter()
	router.Use(cors.New(cors.Options{
		AllowedOrigins: []string{
			"http://localhost:3000",
			"http://localhost:8080",
			"https://www.quickscope.dev",
			"https://quickscope.dev",
			"https://api.quickscope.dev",
		},
		AllowCredentials: true,
		AllowedHeaders:   []string{"Content-Type", "Authorization"},
		Debug:            false,
	}).Handler)

	router.Use(auth.Middleware())
	router.Handle("/", srv)
	router.Post("/github-webhook", Webhooks.HandleGithubWebhook)

	if production == false {
		router.Handle("/playground", playground.Handler("GraphQL Playground", "/"))
		Logger.Info("Connect to http://localhost:" + port + " for GraphQL server")
		Logger.Info("connect to http://localhost:" + port + "/playground for GraphQL playground")
	} else {
		Logger.Info("Connect to https://api.quickscope.dev for GraphQL server")
	}

	log.Fatal(http.ListenAndServe(":"+port, router))
}
