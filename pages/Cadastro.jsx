import axios from "axios";
import {
  Alert,
  Button,
  CloseIcon,
  HStack,
  IconButton,
  Input,
  Text,
  VStack,
  Collapse,
} from "native-base";
import React, { useState, useContext } from "react";
import "react-native-gesture-handler";
import { Container } from "../components/Container";
import Title from "../components/Title";
import { UsuarioContext } from "../context";

const Cadastro = ({ navigation }) => {
  const [nome, setNome] = useState();
  const [email, setEmail] = useState();
  const [senha, setSenha] = useState();
  const [mensagemAlert, setMensagemAlert] = useState();
  const [alertStatus, setAlertStatus] = useState();
  const [mostrarAlert, setMostrarAlert] = useState(false);
  const { setUsuario } = useContext(UsuarioContext);

  const efetuarCadastro = () => {
    if (nome === undefined || email === undefined || senha === undefined) {
      setMensagemAlert("Por favor, verifique os campos.");
      setAlertStatus("error");
      setMostrarAlert(true);
    } else {
      axios
        .post("https://secret-headland-69654.herokuapp.com/usuario", {
          nome,
          email,
          senha,
        })
        .then((result) => {
          console.log("Resultadooo: " + result?.data?.message);
          setUsuario(result.data);
          setMensagemAlert(result?.data?.message);
          setAlertStatus("sucess");
          setMostrarAlert(true);
          setTimeout(() => {
            navigation.navigate("Login");
          }, 2000);
        })
        .catch((erro) => {
          setMensagemAlert("Não foi possível cadastrar o usuário.");
          setAlertStatus("error");
          setMostrarAlert(true);
        });
    }
  };

  return (
    <Container>
      <Title>Cadastro</Title>
      <Collapse isOpen={mostrarAlert}>
        <Alert w="100%" status={alertStatus} mt="5">
          <VStack space={2} flexShrink={1} w="100%">
            <HStack flexShrink={1} space={2} justifyContent="space-between">
              <HStack space={2} flexShrink={1}>
                <Alert.Icon mt="1" />
                <Text fontSize="md" color="coolGray.800">
                  {mensagemAlert}
                  {/* {"Usuário ou senha incorretos"} */}
                </Text>
              </HStack>
              <IconButton
                variant="unstyled"
                icon={<CloseIcon size="3" color="coolGray.600" />}
                onPress={() => {
                  setMostrarAlert(false);
                }}
              />
            </HStack>
          </VStack>
        </Alert>
      </Collapse>
      <Input
        mx="3"
        placeholder="Seu Nome"
        w={{
          base: "80%",
          md: "25%",
        }}
        style={{ marginTop: 20 }}
        onChangeText={setNome}
        value={nome}
        keyboardType="default"
      />
      <Input
        mx="3"
        placeholder="Seu e-mail"
        w={{
          base: "80%",
          md: "25%",
        }}
        style={{ marginTop: 20 }}
        onChangeText={setEmail}
        value={email}
        keyboardType="default"
      />
      <Input
        mx="3"
        placeholder="Sua senha"
        w={{
          base: "80%",
          md: "25%",
        }}
        style={{ margin: 20 }}
        onChangeText={setSenha}
        value={senha}
        type="password"
      />
      <Button size="lg" onPress={() => efetuarCadastro()}>
        Cadastrar
      </Button>
    </Container>
  );
};

export default Cadastro;
