import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { Auth } from 'aws-amplify';

const ForgotPasswordScreen = ({ navigation }) => {
  // State hooks for form inputs and password reset stage
  const [stage, setStage] = useState(1); // 1 = request code, 2 = submit new password
  const [formData, setFormData] = useState({
    username: '',
    code: '',
    newPassword: ''
  });

  const requestResetCode = async () => {
    try {
      await Auth.forgotPassword(formData.username);
      setStage(2); // Proceed to reset password stage
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const resetPassword = async () => {
    try {
      await Auth.forgotPasswordSubmit(formData.username, formData.code, formData.newPassword);
      Alert.alert('Success', 'Password reset successfully');
      navigation.navigate('SignIn'); // Assuming 'SignIn' is the route name for the sign-in screen
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  // Update form data state
  const handleChangeText = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  // Render form based on current stage
  return (
    <View>
      {stage === 1 ? (
        <>
          <TextInput placeholder="Username" onChangeText={(text) => handleChangeText('username', text)} />
          <Button title="Request Code" onPress={requestResetCode} />
        </>
      ) : (
        <>
          <TextInput placeholder="Verification Code" onChangeText={(text) => handleChangeText('code', text)} />
          <TextInput placeholder="New Password" secureTextEntry onChangeText={(text) => handleChangeText('newPassword', text)} />
          <Button title="Reset Password" onPress={resetPassword} />
        </>
      )}
    </View>
  );
};

export default ForgotPasswordScreen;
