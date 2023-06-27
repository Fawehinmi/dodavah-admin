interface Environment {
  Uri: {
    Graphql: string;
  };
}

export const environment: Environment = {
  Uri: {
    Graphql: `${process.env.NEXT_PUBLIC_BASE_URL}/graphql/`, //`http${isProd ? 's' : ''}://${Host}/graphql/`, //Config.graphql_url as any,
  },
};
