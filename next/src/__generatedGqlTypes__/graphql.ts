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
  integrationName: Scalars['String']['output'];
};

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
  createMonitor: Monitor;
};


export type MutationAddGithubInstallationIdArgs = {
  installationId: Scalars['Int64']['input'];
  teamSlug: Scalars['String']['input'];
};


export type MutationAddIntegrationArgs = {
  input: NewIntegration;
};


export type MutationCreateMonitorArgs = {
  input: NewMonitor;
};

export type NewIntegration = {
  integrationName: Scalars['String']['input'];
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
  monitors: Array<Monitor>;
  teamName: Scalars['String']['output'];
  teamSlug: Scalars['String']['output'];
  teamType: Scalars['String']['output'];
};


export type TeamMonitorsArgs = {
  monitorSlug?: InputMaybe<Scalars['String']['input']>;
};

export type GetTeamSlugsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTeamSlugsQuery = { __typename?: 'Query', teams: Array<{ __typename?: 'Team', teamSlug: string }> };

export type LinkGitHubAccountMutationVariables = Exact<{
  teamSlug: Scalars['String']['input'];
  installationId: Scalars['Int64']['input'];
}>;


export type LinkGitHubAccountMutation = { __typename?: 'Mutation', addGithubInstallationId: { __typename?: 'Integration', accountName: string } };


export const GetTeamSlugsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTeamSlugs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teams"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teamSlug"}}]}}]}}]} as unknown as DocumentNode<GetTeamSlugsQuery, GetTeamSlugsQueryVariables>;
export const LinkGitHubAccountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LinkGitHubAccount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamSlug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"installationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int64"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addGithubInstallationId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"teamSlug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamSlug"}}},{"kind":"Argument","name":{"kind":"Name","value":"installationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"installationId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accountName"}}]}}]}}]} as unknown as DocumentNode<LinkGitHubAccountMutation, LinkGitHubAccountMutationVariables>;