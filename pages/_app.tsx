import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "../lib/apollo";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <ApolloProvider client={apolloClient}>
        <Container className="main-content">
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Container>
      </ApolloProvider>
    </SessionProvider>
  );
}

export default MyApp;
