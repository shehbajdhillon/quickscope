// Code generated by github.com/99designs/gqlgen, DO NOT EDIT.

package model

type NewMonitor struct {
	TeamID      int64  `json:"teamId"`
	MonitorName string `json:"monitorName"`
}

type NewProvider struct {
	TeamID              int64  `json:"teamId"`
	ProviderName        string `json:"providerName"`
	ProviderCredentials string `json:"providerCredentials"`
}
