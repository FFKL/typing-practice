import './styles.css';

import { Breadcrumb, Table } from 'antd';

import { RouteComponentProps } from '@reach/router';

import AccessDenied from '../../components/access-denied';
import { PrivilegedUser } from '../../entities/privileged-user';
import useCurrentUser from '../../hooks/use-current-user';
import useUsers from '../../hooks/use-users';
import Page from '../base';
import Actions from './actions';
import Name from './name';
import Role from './role';

import type { User } from "../../entities/user";

function ensurePrivilegedUser(user: User | null): PrivilegedUser | null {
  if (user === null) {
    return null
  }

  try {
    return PrivilegedUser.check(user);
  } catch (err) {
    return null;
  }
}

export default function Dashboard(_: RouteComponentProps) {
  const currentUser = useCurrentUser();
  const [users, onUserUpdates] = useUsers();

  const privilegedUser = ensurePrivilegedUser(currentUser);
  if (privilegedUser === null) {
    return <AccessDenied />
  }


  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name: string) => <Name name={name} />,
    },
    {
      title: "Role",
      key: "role",
      dataIndex: "role",
      render: (role: string) => <Role role={role} />,
    },
    {
      title: "Action",
      key: "action",
      render: (_: undefined, user: User) => (
        <Actions
          user={user}
          currentUser={privilegedUser}
          onAction={(action) => onUserUpdates(user, action)}
        />
      ),
    },
  ];

  return (
    <Page>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-background content-container">
        <Table rowKey="id" columns={columns} dataSource={users} />
      </div>
    </Page>
  );
}
