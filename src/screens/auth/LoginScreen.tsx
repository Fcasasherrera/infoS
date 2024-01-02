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
    // usuario:gs.jessep.martinez y contraseña: ;;3d*:Jz7jyG!Wzm
    usuarios: 'gs.jessep.martinez',
    password: ';;3d*:Jz7jyG!Wzm',
    checkTextInputChange: false,
    isValidEmail: true,
    isValidPassword: true,
  });

  const emailInputChange = (text: string) => {
    const splitedText = text.split('.');
    if (text === '' || splitedText.length === 3) {
      onChange({
        ...form,
        usuarios: text,
        checkTextInputChange: true,
        isValidEmail: true,
      });
    } else {
      onChange({
        ...form,
        usuarios: text,
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
      form.usuarios !== ''
    ) {
      return true;
    }
  };

  const post = () => {
    dispacth(LoginAction({usuarios: form.usuarios, password: form.password}));
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
              errorLabel={'Ingresa un usuario válido'}
              placeholder={'Ingresa su nombre de usuario'}
              value={form.usuarios}
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
