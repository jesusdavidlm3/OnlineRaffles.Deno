import UserAgreementsModal from "../islands/UserAgreementsModal.tsx"
import NavBar from "../islands/NavBar.tsx";

export default function Home() {
  return (<>
    <UserAgreementsModal/>
    <NavBar/>
    <div class="PageBasis">
      <h1>Pagina Principal</h1>
    </div>
  </>);
}
