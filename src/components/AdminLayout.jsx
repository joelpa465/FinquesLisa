import { Helmet } from 'react-helmet-async';

const AdminLayout = ({ children, title = "Panel Admin" }) => {
  return (
    <>
      <Helmet>
        <title>{title} - Finques Lisa</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      {/* Layout completamente independiente - SIN header ni footer público */}
      <div className="min-h-screen bg-gray-100">
        {children}
      </div>
    </>
  );
};

export default AdminLayout;