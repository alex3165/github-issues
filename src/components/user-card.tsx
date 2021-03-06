import * as React from 'react';
import { User } from '../reducers/user';
import { Colors } from '../style';
import { push } from 'connected-react-router';
import { StyleSheet, css } from 'aphrodite/no-important';
import { fromJS } from 'immutable';
import { connect } from 'react-redux';

const styles = {
  container: {
    margin: 20,
    display: 'flex',
    alignItems: 'center'
  },
  first: {
    display: 'flex',
    alignItems: 'center',
    color: Colors.grey,
    fontSize: 14,
    marginRight: 30
  },
  login: {
    marginLeft: 10
  },
  avatar: {
    borderRadius: '50%',
    overflow: 'hidden',
    position: 'relative',
    border: `1px solid ${Colors.borderGrey}`,
    width: 40,
    height: 40,
    backgroundColor: '#ffffff',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  bio: {
    color: Colors.lightGrey,
    fontSize: 13,
    lineHeight: '22px'
  },
  menu: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 24,
    height: 20,
    borderLeft: `1px solid ${Colors.borderGrey}`
  },
  active: {
    fontWeight: 500,
    color: Colors.blue
  }
};

const improvedStyle = StyleSheet.create({
  item: {
    fontSize: 12,
    lineHeight: '18px',
    color: Colors.lightGrey,
    cursor: 'pointer',
    margin: '0px 14px',
    ':hover': {
      color: Colors.middleGrey
    }
  }
});

interface MainProps {
  user: User;
  onLogout: Function;
  location: any;
  push: typeof push;
}

class UserCard extends React.PureComponent<MainProps, { active: number }> {
  public state = {
    active: this.getActiveRoute(this.props.location)
  };

  private onClickHome = () => {
    this.props.push('/');
  };

  private onClickAbout = () => {
    this.props.push('/about');
  };

  private menu = fromJS([
    {
      title: 'My home',
      action: this.onClickHome
    },
    {
      title: 'About',
      action: this.onClickAbout
    },
    {
      title: 'Sign out',
      action: this.props.onLogout
    }
  ]);

  private getActiveRoute(location) {
    if (location.pathname.includes('home')) {
      return 0;
    }

    if (location.pathname.includes('about')) {
      return 1;
    }
  }

  public render() {
    const { user } = this.props;

    return (
      <div style={styles.container}>
        <div style={styles.first}>
          <a
            href={user.get('html_url') as string}
            target="_blank"
            style={Object.assign({}, styles.avatar, {
              backgroundImage: `url('${user.get('avatar_url')}')`
            })}
          />
        </div>

        <div style={styles.menu}>
          {this.menu.map((el, index) => (
            <div
              key={index}
              style={index === this.state.active ? styles.active : {}}
              className={css(improvedStyle.item)}
              onClick={el.get('action')}
            >
              {el.get('title')}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default connect(
  undefined,
  { push }
)(UserCard);
