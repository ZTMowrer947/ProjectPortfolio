// Imports
import { GetServerSideProps, NextPage } from 'next';

// Server-side redirection
const getServerSideProps: GetServerSideProps = async ({ res }) => {
  if (!res.headersSent) {
    // Redirect to project listing
    res.writeHead(301, {
      Location: '/projects',
    });
    res.end();
  }

  // Return empty props
  return Promise.resolve({ props: {} });
};

// Component
const Index: NextPage = () => {
  // Render nothing
  return null;
};

// Exports
export default Index;
export { getServerSideProps };
