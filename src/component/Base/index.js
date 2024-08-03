import CustomNavbar from "../CustomNavBar";

const Base = ({ title = "Welcome to our webSite", children }) => {
  return (
    <div>
      <div className="container-fluid md-0 p-0">
        <CustomNavbar />
        {children}
      </div>
    </div>
  );
};
export default Base;
