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

export type Monitor = {
  __typename?: 'Monitor';
  id: Scalars['Int64']['output'];
  monitorName: Scalars['String']['output'];
  monitorSlug: Scalars['String']['output'];
  teamId: Scalars['Int64']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createMonitor: Monitor;
};


export type MutationCreateMonitorArgs = {
  input: NewMonitor;
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

export type GetTeamsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTeamsQuery = { __typename?: 'Query', teams: Array<{ __typename?: 'Team', id: any }> };


export const GetTeamsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTeams"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teams"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<GetTeamsQuery, GetTeamsQueryVariables>;