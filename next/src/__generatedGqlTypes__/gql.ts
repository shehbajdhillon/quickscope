/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query GetLinkedGitHubAccounts($teamSlug: String!) {\n    teams(teamSlug: $teamSlug) {\n      integrations(integrationName: GITHUB) {\n        id\n        accountName\n        integrationName\n        githubInstallationId\n      }\n    }\n  }\n": types.GetLinkedGitHubAccountsDocument,
    "\n  query GetLinkedVercelAccounts($teamSlug: String!) {\n    teams(teamSlug: $teamSlug) {\n      integrations(integrationName: VERCEL) {\n        id\n        accountName\n        integrationName\n        vercelInstallationId\n      }\n    }\n  }\n": types.GetLinkedVercelAccountsDocument,
    "\n  query GetTeamSlugs {\n    teams {\n      teamSlug\n    }\n  }\n": types.GetTeamSlugsDocument,
    "\n  mutation LinkGitHubAccount($teamSlug: String!, $installationId: Int64!) {\n    addGithubInstallationId(teamSlug: $teamSlug, installationId: $installationId) {\n      accountName\n    }\n  }\n": types.LinkGitHubAccountDocument,
    "\n  mutation LinkVercelAccount($teamSlug: String!, $vercelToken: VercelToken!) {\n    addVercelIntegration(teamSlug: $teamSlug, vercelToken: $vercelToken) {\n      integrationName\n    }\n  }\n": types.LinkVercelAccountDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetLinkedGitHubAccounts($teamSlug: String!) {\n    teams(teamSlug: $teamSlug) {\n      integrations(integrationName: GITHUB) {\n        id\n        accountName\n        integrationName\n        githubInstallationId\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetLinkedGitHubAccounts($teamSlug: String!) {\n    teams(teamSlug: $teamSlug) {\n      integrations(integrationName: GITHUB) {\n        id\n        accountName\n        integrationName\n        githubInstallationId\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetLinkedVercelAccounts($teamSlug: String!) {\n    teams(teamSlug: $teamSlug) {\n      integrations(integrationName: VERCEL) {\n        id\n        accountName\n        integrationName\n        vercelInstallationId\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetLinkedVercelAccounts($teamSlug: String!) {\n    teams(teamSlug: $teamSlug) {\n      integrations(integrationName: VERCEL) {\n        id\n        accountName\n        integrationName\n        vercelInstallationId\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetTeamSlugs {\n    teams {\n      teamSlug\n    }\n  }\n"): (typeof documents)["\n  query GetTeamSlugs {\n    teams {\n      teamSlug\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation LinkGitHubAccount($teamSlug: String!, $installationId: Int64!) {\n    addGithubInstallationId(teamSlug: $teamSlug, installationId: $installationId) {\n      accountName\n    }\n  }\n"): (typeof documents)["\n  mutation LinkGitHubAccount($teamSlug: String!, $installationId: Int64!) {\n    addGithubInstallationId(teamSlug: $teamSlug, installationId: $installationId) {\n      accountName\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation LinkVercelAccount($teamSlug: String!, $vercelToken: VercelToken!) {\n    addVercelIntegration(teamSlug: $teamSlug, vercelToken: $vercelToken) {\n      integrationName\n    }\n  }\n"): (typeof documents)["\n  mutation LinkVercelAccount($teamSlug: String!, $vercelToken: VercelToken!) {\n    addVercelIntegration(teamSlug: $teamSlug, vercelToken: $vercelToken) {\n      integrationName\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;