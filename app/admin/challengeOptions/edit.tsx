import {
  BooleanInput,
  Edit,
  ReferenceInput,
  required,
  SimpleForm,
  TextInput,
} from 'react-admin';

export const ChallengeOptionEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput source="text" validate={[required()]} label="Text" />
        <TextInput source="imageSrc" label="Image Url" />
        <TextInput source="audioSrc" label="Audio Url" />
        <BooleanInput source="correct" label="Correct Option" />
        <ReferenceInput source="challengeId" reference="challenges" />
      </SimpleForm>
    </Edit>
  );
};
