'use client';
import { Admin, Resource } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';

import { CourseList } from './course/list';
import { CourseCreate } from './course/create';
import { CourseEdit } from './course/edit';

import { UnitList } from './unit/list';
import { UnitEdit } from './unit/edit';
import { UnitCreate } from './unit/create';

import { LessonList } from './lesson/list';
import { LessonEdit } from './lesson/edit';
import { LessonCreate } from './lesson/create';

import { ChallengeList } from './challenge/list';
import { ChallengeEdit } from './challenge/edit';
import { ChallengeCreate } from './challenge/create';

import { ChallengeOptionList } from './challengeOptions/list';
import { ChallengeOptionEdit } from './challengeOptions/edit';
import { ChallengeOptionCreate } from './challengeOptions/create';

const dataProvider = simpleRestProvider('/api');

const App = () => {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource
        name="courses"
        recordRepresentation="title"
        list={CourseList}
        edit={CourseEdit}
        create={CourseCreate}
      />
      <Resource
        name="units"
        recordRepresentation="title"
        list={UnitList}
        edit={UnitEdit}
        create={UnitCreate}
      />
      <Resource
        name="lessons"
        recordRepresentation="title"
        list={LessonList}
        edit={LessonEdit}
        create={LessonCreate}
      />
      <Resource
        name="challenges"
        recordRepresentation="question"
        list={ChallengeList}
        edit={ChallengeEdit}
        create={ChallengeCreate}
      />
      <Resource
        name="challengeOptions"
        recordRepresentation="text"
        list={ChallengeOptionList}
        edit={ChallengeOptionEdit}
        create={ChallengeOptionCreate}
        options={{ label: 'Challenge Options' }}
      />
    </Admin>
  );
};

export default App;
