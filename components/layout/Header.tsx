import React, { useState, useEffect } from "react";
import { Navbar, Container, Button } from "react-bootstrap";
import Link from "next/link";
import { useSession, signOut, signIn } from "next-auth/react";

const Header = () => {
  const [name, setName] = useState<string>("");
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      setName(session.user!.name!);
    }
  }, [session]);

  if (!session) {
    return (
      <Navbar expand="lg">
        <Container>
          <Navbar.Brand href="/">Jira Clone</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Link href="/login" passHref>
              <Button onClick={() => signIn()}>Sign In</Button>
            </Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }

  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand href="/">Jira Clone</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          {/*           <Link href="/board" passHref>
            <Button>Board</Button>
          </Link> */}
          <Navbar.Text className="px-3">Signed in as: {name}</Navbar.Text>
          <Link href="/" passHref>
            <Button onClick={() => signOut()}>Log out</Button>
          </Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
