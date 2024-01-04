package webhooks

import (
	"quickscopedev/database"

	"go.uber.org/zap"
)

type WebhookMiddlewareConnectProps struct {
	Logger   *zap.Logger
	Database *database.Queries
}

type WebhookMiddleware struct {
	logger   *zap.Logger
	database *database.Queries
}

type GithubAccountInfo struct {
	AccountName string `json:"accountName"`
	AccountType string `json:"accountType"`
}

func Connect(args WebhookMiddlewareConnectProps) *WebhookMiddleware {
	return &WebhookMiddleware{logger: args.Logger, database: args.Database}
}
