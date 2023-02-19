import { useRouter } from 'next/router';

function getPageName() {
  const router = useRouter();
  let pageName = router.pathname.replace('/', ''); // Remove the leading slash from the pathname
  if (pageName === '') {
    pageName = 'home'; // Add a special case for the home page
  }
  return pageName;
}

export default getPageName;
