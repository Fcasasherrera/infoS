import React, {useState, FC} from 'react';
import {Image} from 'react-native';
import {LoginAction, HideAlert} from '../../redux/auth/login/LoginAction';
import {loginSelector} from '../../redux/auth/login/LoginSelector';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {
  CustomInput,
  CustomView,
  ModalComponent,
  Row,
  Text,
  Title,
  Button,
  FadeInView,
} from '../../components';
import {ContainerNoF} from '../../navigation/options';

const LoginScreen: FC = () => {
  const dispacth = useAppDispatch();
  const {loading, error, errorMessage} = useAppSelector(loginSelector);
  const [form, onChange] = useState({
    username: 'fcasasherrera@gmail.com',
    password: '123456',
    checkTextInputChange: false,
    isValidEmail: true,
    isValidPassword: true,
  });

  const emailInputChange = (text: string) => {
    const regx = /^([A-Za-z0-9_\-\.])+\@([[A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (text === '' || regx.test(text)) {
      onChange({
        ...form,
        username: text,
        checkTextInputChange: true,
        isValidEmail: true,
      });
    } else {
      onChange({
        ...form,
        username: text,
        checkTextInputChange: false,
        isValidEmail: false,
      });
    }
  };

  const passwordInputChange = (text: string) => {
    if (text === '' || text.trim().length >= 8) {
      onChange({
        ...form,
        password: text,
        checkTextInputChange: true,
        isValidPassword: true,
      });
    } else {
      onChange({
        ...form,
        password: text,
        checkTextInputChange: false,
        isValidPassword: false,
      });
    }
  };

  const isValidForm = () => {
    if (
      form.isValidEmail &&
      form.isValidPassword &&
      form.password &&
      form.username !== ''
    ) {
      return true;
    }
  };

  const post = () => {
    dispacth(LoginAction({username: form.username, password: form.password}));
  };

  return (
    <ContainerNoF>
      <FadeInView>
        <Row align="center" justify="center">
          <Image
            resizeMode="contain"
            style={{width: 256}}
            source={require('../../../assets/images/logoDots.png')}
          />
          <Row>
            <Title size="medium">{'Bienvenido'}</Title>
            <Text gray>{'Ingresa tus datos para iniciar sesión'}</Text>
          </Row>
          <CustomView
            style={{
              marginTop: 24,
              alignItems: 'center',
            }}>
            <CustomInput
              error={!form.isValidEmail}
              label={'Usuario'}
              errorLabel={'Ingresa un correo válido'}
              placeholder={'Ingresa tu correo electrónico'}
              value={form.username}
              onChange={emailInputChange}
              isLoading={loading}
            />

            <CustomInput
              error={!form.isValidPassword}
              label={'Contraseña'}
              errorLabel={'La contraseña debe tener al menos 8 caracteres'}
              placeholder={'Ingresar contraseña'}
              hidePasswordIcon
              value={form.password}
              onChange={passwordInputChange}
              isLoading={loading}
            />

            <Button
              // isLoading={loading}
              onPress={() => {}}
              style={{alignSelf: 'flex-end'}}
              link>
              {'Olvidaste tu contraseña?'}
            </Button>
          </CustomView>
        </Row>
        <CustomView style={{marginBottom: 18}}>
          <Button disabled={!isValidForm()} isLoading={loading} onPress={post}>
            {'Ingresar'}
          </Button>
        </CustomView>

        <ModalComponent
          alert
          visible={error}
          onBack={() => {
            dispacth(HideAlert());
          }}
          height={'220'}>
          <CustomView style={{padding: 16, alignItems: 'center'}}>
            <Text
              style={{
                marginTop: 8,
                textAlign: 'center',
              }}>
              {errorMessage}
            </Text>
          </CustomView>
          <CustomView>
            <Button
              style={{marginTop: 10}}
              isLoading={loading}
              onPress={() => {
                dispacth(HideAlert());
              }}>
              {'loginScreen.loginButtonError'}
            </Button>
          </CustomView>
        </ModalComponent>
      </FadeInView>
    </ContainerNoF>
  );
};

export default LoginScreen;
