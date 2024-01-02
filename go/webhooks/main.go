package webhooks

import "go.uber.org/zap"

type WebhookMiddlewareConnectProps struct {
	Logger *zap.Logger
}

type WebhookMiddleware struct {
	logger *zap.Logger
}

func Connect(args WebhookMiddlewareConnectProps) *WebhookMiddleware {
	return &WebhookMiddleware{logger: args.Logger}
}
