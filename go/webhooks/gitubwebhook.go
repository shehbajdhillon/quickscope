package webhooks

import (
	"fmt"
	"net/http"
	"os"

	"github.com/google/go-github/v57/github"
	"go.uber.org/zap"
)

func (wm *WebhookMiddleware) HandleGithubWebhook(w http.ResponseWriter, r *http.Request) {

	secret := os.Getenv("GITHUB_WEBHOOK_SECRET")
	payload, err := github.ValidatePayload(r, []byte(secret))
	if err != nil {
		wm.logger.Error("[GITHUB WEBHOOK] Invalid payload signature")
		http.Error(w, "Invalid payload signature", http.StatusUnauthorized)
		return
	}

	event, err := github.ParseWebHook(github.WebHookType(r), payload)
	// Parsing the GitHub event
	if err != nil {
		wm.logger.Error("[GITHUB WEBHOOK] Error parsing JSON")
		http.Error(w, "Error parsing JSON", http.StatusBadRequest)
		return
	}

	switch e := event.(type) {
	case *github.InstallationEvent:
		wm.handleInstallationEvent(e)
	default:
		wm.logger.Error(
			"[GITHUB WEBHOOK] Unhandled event type",
			zap.String("event_type", github.WebHookType(r)))
	}
}

func (wm *WebhookMiddleware) handleInstallationEvent(event *github.InstallationEvent) {

	installationId := event.GetInstallation().GetID()
	account := event.GetInstallation().GetAccount()

	accountName := account.GetLogin()
	accountType := account.GetType()

	wm.logger.Info(fmt.Sprintf("Installation ID: %d", installationId))

	if account != nil {
		wm.logger.Info(
			fmt.Sprintf("Account Login: %s, Account Type: %s", account.GetLogin(), account.GetType()),
		)
	}

	logMessage := func(message string) {
		wm.logger.Info(
			message,
			zap.String("account_name", accountName),
			zap.String("account_type", accountType),
			zap.Int64("installation_id", installationId),
		)
	}

	// Handling installation event
	switch event.GetAction() {
	case "created":
		logMessage("[GITHUB WEBHOOK] App installation created")
	case "deleted":
		logMessage("[GITHUB WEBHOOK] App installation deleted")
	case "suspended":
		logMessage("[GITHUB WEBHOOK] App installation suspended")
	case "unsuspended":
		logMessage("[GITHUB WEBHOOK] App installation unsuspended")
	default:
		wm.logger.Error(
			"[GITHUB WEBHOOK] Unknown installation action",
			zap.String("installation_event", event.GetAction()),
			zap.Int64("installation_id", installationId),
			zap.String("account_name", accountName),
			zap.String("account_type", accountType),
		)
	}
}
