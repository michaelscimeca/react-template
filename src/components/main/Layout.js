import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';
import getPageName from '../../utils/getPageName';

export default function Layout(props) {
  const pageName = getPageName();
  return (
    <>
     <Header/>
    <main className={`${pageName}-page`}>
      <Nav/>
      {props.children}
    </main>
    <Footer/>
    </>
  );
}
