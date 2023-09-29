import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import React, {useState} from 'react';
import {
  ContactUsProps,
  FormRgx,
  IContactForm,
  IContactFormInitial,
  errorMessage,
  formHasError,
  formRgx,
} from './ContactUsProps';
import styles from './ContactUsStyles';
import NavBar from '../ui/NavBar';
import {hebrew} from '../Hebrew';
import Input from '../ui/Input';
import {useModal} from 'react-native-modalfy';
import {sendMail} from '../api';

export const ContactUs = ({navigation}: ContactUsProps) => {
  const [form, setForm] = useState<IContactForm>(IContactFormInitial);
  const [loading, setLoading] = useState<boolean>(false);
  const {openModal} = useModal();
  const handleChange = (key: keyof IContactForm, val: string) => {
    setForm(f => {
      return {...f, [key]: {...f[key], value: val}};
    });
  };
  const validateForm = (form: IContactForm): IContactForm => {
    const updatedForm = {...form};
    for (const key of Object.keys(updatedForm)) {
      const field = updatedForm[key as keyof IContactForm];
      const reg = formRgx[key as keyof FormRgx];
      field.error = !reg.test(field.value)
        ? errorMessage[key as keyof object]
        : '';
    }
    return updatedForm;
  };
  const handleSubmitButton = () => {
    const formWithValidation = validateForm({...form});
    setForm(formWithValidation);
     if (!formHasError(formWithValidation)) onSubmit();
  };
  const onSubmit = () => {
    setLoading(true);
    sendMail(form)
      .then(r => console.log(r))
      .finally(() => {
        setLoading(false);
        openModal('ContactUsModal', {onNext: () => navigation.goBack()});
      });
  };
  console.log(form);
  return (
    <View style={styles.container}>
      <NavBar
        title={hebrew.contect_Us}
        navigateBack={() => navigation.goBack()}
      />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{hebrew.contect_Us_title} </Text>
      </View>
      <View style={styles.inputs}>
        <Input
          text={form.fullName.value}
          textChanged={(t: string) => {
            handleChange('fullName', t);
          }}
          errorMessage={form.fullName.error}
          placeHolder={hebrew.fullName}
          extraStyles={styles.input}
        />
        <Input
          text={form.email.value}
          textChanged={(t: string) => {
            handleChange('email', t);
          }}
          errorMessage={form.email.error}
          placeHolder={hebrew.email}
          extraStyles={styles.input}
        />
        <Input
          text={form.phone.value}
          textChanged={(t: string) => {
            handleChange('phone', t);
          }}
          errorMessage={form.phone.error}
          placeHolder={hebrew.phone}
          extraStyles={styles.input}
        />
        <Input
          text={form.message.value}
          errorMessage={form.message.error}
          textChanged={(t: string) => {
            handleChange('message', t);
          }}
          placeHolder={hebrew.message}
          extraStyles={styles.input}
          multiline={true}
          numberOfLines={6}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          disabled={loading}
          onPress={handleSubmitButton}
          style={styles.button}>
          {loading && <ActivityIndicator />}
          <Text style={styles.buttonText}>{hebrew.send}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
