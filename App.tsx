import {ReactElement} from 'react';
import LayoutHeader from './pages/layout/LayoutHeader';
import {styled} from '@mui/system';
import {Route, Switch, useLocation} from 'react-router-dom';
import routes from './utils/routes/routes';
import {LicenseInfo} from '@mui/x-data-grid-pro';
import LayoutSidebar from 'pages/layout/LayoutSidebar';
import {SIDEBAR_WIDTH, TOPBAR_HEIGHT} from 'types/layout';
import PrintLabelDialog from 'pages/receive/PrintLabelDialog';

const Main = styled('div')(() => {
  return {
    gridArea: 'main',
    overflow: 'auto',
    position: 'relative',
  };
});

const LayoutHeaderContainer = styled('div')(() => ({
  gridArea: 'header',
}));

const LayoutSidebarContainer = styled('div')(() => ({
  gridArea: 'sidebar',
  display: 'flex',
}));

const Layout = styled('div')(() => ({
  display: 'grid',
  height: '100%',
  gridTemplateColumns: `${SIDEBAR_WIDTH}px auto`,
  gridTemplateRows: `${TOPBAR_HEIGHT}px auto`,
  gridTemplateAreas: `
          "header header"
          "sidebar main"
        `,
}));

function App(): ReactElement {
  const location = useLocation();
  LicenseInfo.setLicenseKey(import.meta.env.VITE_DATA_GRID_PRO_LICENSE_KEY);

  if (location.pathname.substring(1) === 'print') {
    return <PrintLabelDialog />;
  }

  return (
    <Layout>
      <LayoutHeaderContainer>
        <LayoutHeader />
      </LayoutHeaderContainer>
      <LayoutSidebarContainer>
        <LayoutSidebar />
      </LayoutSidebarContainer>
      <Main>
        <Switch>
          {routes.map((route, i) => (
            <Route key={String(i + route.path)} {...route} />
          ))}
        </Switch>
      </Main>
    </Layout>
  );
}

export default App;
