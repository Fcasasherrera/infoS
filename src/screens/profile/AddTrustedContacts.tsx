import React, {FC} from 'react';
import {str} from '../../locales/Locale';
import {Button} from '../../components/Button';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {FadeInView} from '../../components/FadeInView';
import FIcon from 'react-native-vector-icons/AntDesign';
import {
  CustomInput,
  CustomView,
  Row,
  Caption,
  Text,
  CustomSelect,
} from '../../components';
import {ContainerNoF, IconContainer} from '../../navigation/options';
import {FONTS, SIZES} from '../../constants/colors';
import {useNavigation} from '@react-navigation/native';
import {typesKinships} from '../../constants/.env';
import {useFormik} from 'formik';
import {validationsTrustedContact} from '../../utils';
import {trustedContactsSelector} from '../../redux/trustedContacts/TrustedSelector';
import {
  getContact,
  postContact,
} from '../../redux/trustedContacts/TrustedActions';

const AddTrustedContacts: FC = (props: any) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const {loading, error} = useAppSelector(trustedContactsSelector);

  const {values, isSubmitting, setFieldValue, handleSubmit, errors} = useFormik(
    {
      initialValues: {
        name: '',
        address: '',
        phone: '',
        email: '',
        idKinship: null,
        kinshipText: '',
      },
      onSubmit: values => {
        dispatch(postContact(values));
        dispatch(getContact());
        navigation.pop();
      },
      validate: values => {
        const errors = {};
        validationsTrustedContact(values, errors);
        return errors;
      },

      validateOnMount: false,
      validateOnChange: false,
      validateOnBlur: false,
    },
  );
  return (
    <ContainerNoF>
      <FadeInView
        isScroll
        contentContainerStyle={{padding: 18}}
        align="flex-start">
        <CustomView style={{marginTop: 8}}>
          <Row
            fdirection="row"
            align="center"
            justify="flex-start"
            style={{marginBottom: SIZES.padding}}>
            <IconContainer onPress={() => navigation.pop()}>
              <FIcon name="arrowleft" size={24} color={'black'} />
            </IconContainer>
            <Text style={{...FONTS.h3, marginLeft: 16}}>
              {str('trustedContacts.form.title')}
            </Text>
          </Row>
          <Caption>{str('trustedContacts.form.description')}</Caption>

          <CustomView style={{marginTop: 50, marginBottom: 12}}>
            <CustomInput
              error={errors.name ? true : false}
              errorLabel={errors.name}
              marginBottom={'40'}
              label={str('trustedContacts.form.name')}
              placeholder={str('trustedContacts.form.name')}
              value={values.name}
              onChange={(text: string) => setFieldValue('name', text)}
              isLoading={loading}
            />
            <CustomSelect
              error={errors.idKinship ? true : false}
              marginBottom={'40'}
              label={str('trustedContacts.form.kinship')}
              placeholder={str('trustedContacts.form.kinship')}
              value={values.kinshipText}
              onChange={(item: any) => {
                setFieldValue('idKinship', item.id);
                setFieldValue('kinshipText', item.title);
              }}
              isLoading={loading}
              icon
              data={typesKinships}
            />
            <CustomInput
              keyboardType="numeric"
              error={errors.phone ? true : false}
              errorLabel={errors.phone}
              marginBottom={'40'}
              label={str('trustedContacts.form.phone')}
              placeholder={'555-555-5555'}
              value={values.phone}
              onChange={(text: string) => setFieldValue('phone', text)}
              isLoading={loading}
            />
            <CustomInput
              error={errors.email ? true : false}
              errorLabel={errors.email}
              marginBottom={'40'}
              label={str('trustedContacts.form.email')}
              placeholder={str('trustedContacts.form.email')}
              value={values.email}
              onChange={(text: string) => setFieldValue('email', text)}
              isLoading={loading}
            />

            <Button
              style={{marginTop: 40}}
              isLoading={loading}
              onPress={handleSubmit}>
              {str('trustedContacts.form.button')}
            </Button>
          </CustomView>
        </CustomView>
      </FadeInView>
    </ContainerNoF>
  );
};

export default AddTrustedContacts;
