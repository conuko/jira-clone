import React, { useState, useEffect } from "react";
import { Navbar, Container, Button, NavbarBrand } from "react-bootstrap";
import Link from "next/Link";
import { useSession, signOut } from "next-auth/react";

const Header = () => {
  const [name, setName] = useState<string>("");
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      console.log(session);
      setName(session.user.name);
    }
  }, [session]);

  return (
    <Navbar>
      <Container>
        <NavbarBrand>Project Management</NavbarBrand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text className="p-3">
            Signed in as: <a href="#login">{name}</a>
          </Navbar.Text>
          <Link href="" passHref>
            <Button onClick={() => signOut()}>Logout</Button>
          </Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
