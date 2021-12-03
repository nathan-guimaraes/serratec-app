import { AntDesign } from "@expo/vector-icons";
import {
    createDrawerNavigator,
    DrawerContentScrollView
} from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import {
    Box, Divider, HStack, Icon, Pressable, Text, VStack
} from "native-base";
import * as React from "react";
import Login from "../pages/Login";
import TesteStack from '../pages/TesteStack';

const Drawer = createDrawerNavigator();

const getIcon = (screenName) => {
  switch (screenName) {
    case "Alunos":
      return "user";
    case "Login":
      return "login";
    case "Materias":
      return "book";
    default:
      return undefined;
  }
};

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props} safeArea>
      <VStack space="6" my="2" mx="1">
        <Box px="4">
          <Text bold color="gray.700">
            {/* TODO: Nome du usuário logado */}
          </Text>
          <Text fontSize="14" mt="1" color="gray.500" fontWeight="500">
            {/* TODO: Email do usuário logado */}
          </Text>
        </Box>
        <VStack divider={<Divider />} space="4">
          <VStack space="3">
            {props.state.routeNames.map((name, index) => (
              <Pressable
                px="5"
                py="3"
                rounded="md"
                bg={
                  index === props.state.index
                    ? "rgba(154, 224, 236, 0.1)"
                    : "transparent"
                }
                onPress={(event) => {
                  props.navigation.navigate(name);
                }}
                key={index}
              >
                <HStack space="7" alignItems="center">
                  <Icon
                    color={
                      index === props.state.index ? "primary.500" : "gray.500"
                    }
                    size="5"
                    as={<AntDesign name={getIcon(name)} />}
                  />
                  <Text
                    fontWeight="500"
                    color={
                      index === props.state.index ? "primary.500" : "gray.700"
                    }
                  >
                    {name}
                  </Text>
                </HStack>
              </Pressable>
            ))}
          </VStack>
        </VStack>
      </VStack>
    </DrawerContentScrollView>
  );
}
function MyDrawer() {
  return (
    <Box safeArea flex={1}>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen name="Login" component={Login} />
        <Drawer.Screen name="Alunos" component={Login} />
        <Drawer.Screen name="Materias" component={Login} />
        <Drawer.Screen name="Teste Stack" component={TesteStack} />
      </Drawer.Navigator>
    </Box>
  );
}
export default function Menu() {
  return (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  );
}