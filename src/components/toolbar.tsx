import * as React from 'react';
import { Set } from 'immutable';
import Input from './input-autocomplete';
import { Colors } from '../style';
import UserCard from './user-card';
import { User } from '../reducers/user';

interface MainProps {
  onClear: Function;
  onNext: Function;
  onGetAll: Function;
  onSelectLanguage: Function;
  languages: Set<string>;
  user: User;
};

const styles = {
  container: {
    backgroundColor: 'white',
    flex: 3,
    borderLeft: `1px solid ${Colors.borderGrey}`
  },
  languageFilter: {},
  filterTitle: {
    backgroundColor: 'rgba(20, 22, 36, 0.02)',
    color: Colors.lightGrey,
    padding: '10px 0px',
    paddingLeft: 20,
    fontSize: 14,
    borderTop: `1px solid ${Colors.borderGrey}`
  }
};

class Toolbar extends React.Component<MainProps, any> {
  public render() {
    const { onClear, onNext, languages, onSelectLanguage, onGetAll, user } = this.props;

    return (
      <div style={styles.container}>
        <UserCard user={user}/>
        <div style={styles.filterTitle}>
          Filters
        </div>
        <button onClick={onClear}>clear</button>
        <button onClick={onNext}>More</button>
        <button onClick={onGetAll}>All</button>
        <Input
          onSelect={onSelectLanguage}
          style={styles.languageFilter}
          list={languages}/>
      </div>
    );
  }
}

export default Toolbar;
