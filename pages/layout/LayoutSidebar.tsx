import {MiniNavbar} from '@cellebrite/design-system';
import {useGetLayoutSidebarItems} from './useGetLayoutSidebarItems';

const LayoutSidebar = (): JSX.Element => {
  const items = useGetLayoutSidebarItems();
  return <MiniNavbar items={items} />;
};

export default LayoutSidebar;
