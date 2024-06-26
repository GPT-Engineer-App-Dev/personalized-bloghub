import { Box, Container, Flex, Heading, Link, Text, VStack, HStack, Divider, Button, useColorMode, Switch } from "@chakra-ui/react";
import { FaTwitter, FaFacebook, FaInstagram, FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";

const Index = ({ colorMode, toggleColorMode }) => {
  const [posts, setPosts] = useState([]);

  const handleDelete = (index) => {
    const updatedPosts = posts.filter((_, i) => i !== index);
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  };

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    setPosts(storedPosts);
  }, []);

  return (
    <Container maxW="container.xl" p={4} bg={colorMode === "dark" ? "gray.800" : "white"} color={colorMode === "dark" ? "white" : "black"}>
      {/* Navigation Bar */}
      <Flex as="nav" bg={colorMode === "dark" ? "gray.700" : "gray.100"} p={4} mb={8} justifyContent="space-between" alignItems="center">
        <Heading as="h1" size="lg">My Blog</Heading>
        <HStack spacing={4}>
          <Link as={RouterLink} to="/">Home</Link>
          <Link as={RouterLink} to="/add-post">Add Post</Link>
          <Link href="#">About</Link>
          <Link href="#">Blog</Link>
          <Link href="#">Contact</Link>
        <Switch color="green" isChecked={colorMode === "dark"} onChange={toggleColorMode} />
        </HStack>
      </Flex>

      <Flex direction={{ base: "column", md: "row" }} align="start">
        {/* Main Section */}
        <Box flex="3" p={4}>
          <Heading as="h2" size="xl" mb={4}>Welcome to My Blog</Heading>
          <Text mb={4}>This is where your blog posts will be displayed.</Text>
          <Button as={RouterLink} to="/add-post" colorScheme="blue" mb={4}>Add New Post</Button>
          <Divider mb={4} />
          <VStack spacing={4} align="start">
            {posts.map((post, index) => (
              <Box key={index} position="relative">
                <Heading as="h3" size="lg">{post.title}</Heading>
                <Text>{post.content}</Text>
                <Text fontSize="sm" color="gray.500">Tags: {post.tags.join(", ")}</Text>
                <Button 
                  position="absolute" 
                  top="0" 
                  right="0" 
                  colorScheme="red" 
                  size="sm" 
                  onClick={() => handleDelete(index)}
                >
                  <FaTrash />
                </Button>
              </Box>
            ))}
          </VStack>
        </Box>

        {/* Sidebar */}
        <Box flex="1" p={4} bg={colorMode === "dark" ? "gray.700" : "gray.50"} borderRadius="md" ml={{ md: 4 }} mt={{ base: 4, md: 0 }}>
          <Heading as="h3" size="md" mb={4}>Recent Posts</Heading>
          <VStack spacing={2} align="start">
            {posts.slice(0, 3).map((post, index) => (
              <Link key={index} href="#">{post.title}</Link>
            ))}
          </VStack>
          <Divider my={4} />
          <Heading as="h3" size="md" mb={4}>Categories</Heading>
          <VStack spacing={2} align="start">
            <Link href="#">Category 1</Link>
            <Link href="#">Category 2</Link>
            <Link href="#">Category 3</Link>
          </VStack>
        </Box>
      </Flex>

      {/* Footer */}
      <Box as="footer" bg={colorMode === "dark" ? "gray.700" : "gray.100"} p={4} mt={8}>
        <HStack justifyContent="center" spacing={4}>
          <Link href="#"><FaTwitter /></Link>
          <Link href="#"><FaFacebook /></Link>
          <Link href="#"><FaInstagram /></Link>
        </HStack>
      </Box>
    </Container>
  );
};

export default Index;