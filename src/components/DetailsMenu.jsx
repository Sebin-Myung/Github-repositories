import "@github/details-menu-element";

const DetailsMenu = ({ role, children }) => {
  return <details-menu role={role}>{children}</details-menu>;
};

export default DetailsMenu;
