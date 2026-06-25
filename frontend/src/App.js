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
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from "./layout/mainLayout";
import LoginLayout from "./layout/loginLayout";

import Home from "./pages/pageHome/home";
import Login from "./pages/pageLogin/login";
import SearchResults from "./pages/pageSearchResults/searchResults";
import Address from "./pages/pageAddress/address";
import Account from "./pages/pageAccount/account";
import Cart from "./pages/pageCart/cartX";
import Payment from "./pages/pagePayment/payment";
import DetailProduct from "./pages/pageDetailsProducts/detailProduct";
import History from "./pages/pageHistory/history";
import { ConfirmCOD, ConfirmMoMo, ConfirmVNPAY } from "./pages/pagePayment/confirmPages";

// Chặn trang nếu chưa đăng nhập hoặc tài khoản chưa kích hoạt
const ProtectedRoute = ({ children }) => {
    const userStr = localStorage.getItem("user");
    if (!userStr) {
        return <Navigate to="/login" replace />;
    }
    const user = JSON.parse(userStr);
    if (user.isVerified === false || user.isVerified === 0) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

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
                    <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
                    <Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
                    <Route path="/history" element={<History />} />
                    <Route path="/detailproduct/:id" element={<DetailProduct />} />
                </Route>
                <Route path="/payment/confirm-cod" element={<ConfirmCOD />} />
                <Route path="/payment/confirm-momo" element={<ConfirmMoMo />} />
                <Route path="/payment/confirm-vnpay" element={<ConfirmVNPAY />} />
                {/* Layout login */}
                <Route element={<LoginLayout />}>
                    <Route path="/login" element={<Login />} />
                </Route>

            </Routes>
        </BrowserRouter>
    );
}

export default App;