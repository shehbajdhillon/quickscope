/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  Int64: { input: any; output: any; }
  Upload: { input: any; output: any; }
};

export type Integration = {
  __typename?: 'Integration';
  accountName: Scalars['String']['output'];
  githubInstallationId: Scalars['Int64']['output'];
  id: Scalars['Int64']['output'];
  integrationName: IntegrationType;
  vercelInstallationId: Scalars['String']['output'];
};

export enum IntegrationType {
  Github = 'GITHUB',
  Posthog = 'POSTHOG',
  Railwayapp = 'RAILWAYAPP',
  Vercel = 'VERCEL'
}

export type Monitor = {
  __typename?: 'Monitor';
  id: Scalars['Int64']['output'];
  monitorName: Scalars['String']['output'];
  monitorSlug: Scalars['String']['output'];
  teamId: Scalars['Int64']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addGithubInstallationId: Integration;
  addIntegration: Integration;
  addVercelIntegration: Integration;
  createMonitor: Monitor;
};


export type MutationAddGithubInstallationIdArgs = {
  installationId: Scalars['Int64']['input'];
  teamSlug: Scalars['String']['input'];
};


export type MutationAddIntegrationArgs = {
  input: NewIntegration;
};


export type MutationAddVercelIntegrationArgs = {
  teamSlug: Scalars['String']['input'];
  vercelToken: VercelToken;
};


export type MutationCreateMonitorArgs = {
  input: NewMonitor;
};

export type NewIntegration = {
  integrationName: IntegrationType;
  teamId: Scalars['Int64']['input'];
};

export type NewMonitor = {
  monitorName: Scalars['String']['input'];
  teamId: Scalars['Int64']['input'];
};

export type Query = {
  __typename?: 'Query';
  teams: Array<Team>;
};


export type QueryTeamsArgs = {
  teamSlug?: InputMaybe<Scalars['String']['input']>;
};

export type Team = {
  __typename?: 'Team';
  id: Scalars['Int64']['output'];
  integrations: Array<Integration>;
  monitors: Array<Monitor>;
  teamName: Scalars['String']['output'];
  teamSlug: Scalars['String']['output'];
  teamType: Scalars['String']['output'];
};


export type TeamIntegrationsArgs = {
  integrationId?: InputMaybe<Scalars['Int64']['input']>;
  integrationName?: InputMaybe<IntegrationType>;
};


export type TeamMonitorsArgs = {
  monitorSlug?: InputMaybe<Scalars['String']['input']>;
};

export type VercelToken = {
  accessToken: Scalars['String']['input'];
  accountName: Scalars['String']['input'];
  installationId: Scalars['String']['input'];
  teamId: Scalars['String']['input'];
  tokenType: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type GetLinkedGitHubAccountsQueryVariables = Exact<{
  teamSlug: Scalars['String']['input'];
}>;


export type GetLinkedGitHubAccountsQuery = { __typename?: 'Query', teams: Array<{ __typename?: 'Team', integrations: Array<{ __typename?: 'Integration', id: any, accountName: string, integrationName: IntegrationType, githubInstallationId: any }> }> };

export type GetLinkedVercelAccountsQueryVariables = Exact<{
  teamSlug: Scalars['String']['input'];
}>;


export type GetLinkedVercelAccountsQuery = { __typename?: 'Query', teams: Array<{ __typename?: 'Team', integrations: Array<{ __typename?: 'Integration', id: any, accountName: string, integrationName: IntegrationType, vercelInstallationId: string }> }> };

export type GetTeamSlugsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTeamSlugsQuery = { __typename?: 'Query', teams: Array<{ __typename?: 'Team', teamSlug: string }> };

export type LinkGitHubAccountMutationVariables = Exact<{
  teamSlug: Scalars['String']['input'];
  installationId: Scalars['Int64']['input'];
}>;


export type LinkGitHubAccountMutation = { __typename?: 'Mutation', addGithubInstallationId: { __typename?: 'Integration', accountName: string } };

export type LinkVercelAccountMutationVariables = Exact<{
  teamSlug: Scalars['String']['input'];
  vercelToken: VercelToken;
}>;


export type LinkVercelAccountMutation = { __typename?: 'Mutation', addVercelIntegration: { __typename?: 'Integration', integrationName: IntegrationType } };


export const GetLinkedGitHubAccountsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetLinkedGitHubAccounts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamSlug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teams"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"teamSlug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamSlug"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"integrations"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"integrationName"},"value":{"kind":"EnumValue","value":"GITHUB"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"accountName"}},{"kind":"Field","name":{"kind":"Name","value":"integrationName"}},{"kind":"Field","name":{"kind":"Name","value":"githubInstallationId"}}]}}]}}]}}]} as unknown as DocumentNode<GetLinkedGitHubAccountsQuery, GetLinkedGitHubAccountsQueryVariables>;
export const GetLinkedVercelAccountsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetLinkedVercelAccounts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamSlug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teams"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"teamSlug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamSlug"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"integrations"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"integrationName"},"value":{"kind":"EnumValue","value":"VERCEL"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"accountName"}},{"kind":"Field","name":{"kind":"Name","value":"integrationName"}},{"kind":"Field","name":{"kind":"Name","value":"vercelInstallationId"}}]}}]}}]}}]} as unknown as DocumentNode<GetLinkedVercelAccountsQuery, GetLinkedVercelAccountsQueryVariables>;
export const GetTeamSlugsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTeamSlugs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teams"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teamSlug"}}]}}]}}]} as unknown as DocumentNode<GetTeamSlugsQuery, GetTeamSlugsQueryVariables>;
export const LinkGitHubAccountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LinkGitHubAccount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamSlug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"installationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int64"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addGithubInstallationId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"teamSlug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamSlug"}}},{"kind":"Argument","name":{"kind":"Name","value":"installationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"installationId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accountName"}}]}}]}}]} as unknown as DocumentNode<LinkGitHubAccountMutation, LinkGitHubAccountMutationVariables>;
export const LinkVercelAccountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LinkVercelAccount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamSlug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vercelToken"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VercelToken"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addVercelIntegration"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"teamSlug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamSlug"}}},{"kind":"Argument","name":{"kind":"Name","value":"vercelToken"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vercelToken"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"integrationName"}}]}}]}}]} as unknown as DocumentNode<LinkVercelAccountMutation, LinkVercelAccountMutationVariables>;