/*
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./pages/pageLogin/login";
import Home from "./pages/pageHome/home";
import SearchResults from "./pages/pageSearchResults/searchResults";
import Address from "./pages/pageAddress/address";
import Account from "./pages/pageAccount/account";
import Cart from "./pages/pageCart/cart";
import Payment from "./pages/pagePayment/payment";
import DetailProduct from "./pages/pageDetailsProducts/detailProduct";
import MainLayout from "./layout/mainLayout";
import LoginLayout from "./layout/loginLayout";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout> <Home /></MainLayout>}/>
                <Route path="/login" element={<LoginLayout><Login /></LoginLayout>} />
                <Route path="/search" element={<MainLayout><SearchResults /></MainLayout>} />
                <Route path="/address" element={<MainLayout><Address /></MainLayout>} />
                <Route path="/account" element={<MainLayout><Account /></MainLayout>} />
                <Route path="/cart" element={<MainLayout><Cart /></MainLayout>} />
                <Route path="/payment" element={<MainLayout><Payment /></MainLayout>} />
                <Route path="/detailproduct/:id" element={<MainLayout><DetailProduct /></MainLayout>} />
            </Routes>
        </BrowserRouter>
    );
}
console.log(DetailProduct);
export default App;
*/
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from "./layout/mainLayout";
import LoginLayout from "./layout/loginLayout";

import Home from "./pages/pageHome/home";
import Login from "./pages/pageLogin/login";
import SearchResults from "./pages/pageSearchResults/searchResults";
import Address from "./pages/pageAddress/address";
import Account from "./pages/pageAccount/account";
import Cart from "./pages/pageCart/cart";
import Payment from "./pages/pagePayment/payment";
import DetailProduct from "./pages/pageDetailsProducts/detailProduct";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                {/* Layout chính */}
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/search" element={<SearchResults />} />
                    <Route path="/address" element={<Address />} />
                    <Route path="/account" element={<Account />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/payment" element={<Payment />} />
                    <Route path="/detailproduct/:id" element={<DetailProduct />} />
                </Route>

                {/* Layout login */}
                <Route element={<LoginLayout />}>
                    <Route path="/login" element={<Login />} />
                </Route>

            </Routes>
        </BrowserRouter>
    );
}

export default App;