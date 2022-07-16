import { ChakraProvider, Spinner, Center } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import ChatBox from "./ChatBox";
import Login from "./Login";

function MyApp({ Component, pageProps }) {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return (
      <ChakraProvider>
        <Center h="100vh">
          <Spinner size="xl" />
        </Center>
      </ChakraProvider>
    );
  }

  if (!user) {
    return <Login />;
  }

  return (
    <ChakraProvider>
      <ChatBox />
    </ChakraProvider>
  );
}

export default MyApp;
