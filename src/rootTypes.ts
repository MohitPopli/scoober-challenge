import { HomeState } from './containers/Home/store/types';

export interface ApplicationRootState {
  readonly home: HomeState;
}
