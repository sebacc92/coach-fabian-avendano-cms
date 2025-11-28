import type { Schema, Struct } from '@strapi/strapi';

export interface RoutineExerciseSet extends Struct.ComponentSchema {
  collectionName: 'components_routine_exercise_sets';
  info: {
    displayName: 'ExerciseSet';
    icon: 'emotionHappy';
  };
  attributes: {
    exercise: Schema.Attribute.Relation<'oneToOne', 'api::exercise.exercise'>;
    Reps: Schema.Attribute.String;
    Rest: Schema.Attribute.String;
    Sets: Schema.Attribute.Integer;
    TechniqueNote: Schema.Attribute.Text;
    Tiempo: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'routine.exercise-set': RoutineExerciseSet;
    }
  }
}
