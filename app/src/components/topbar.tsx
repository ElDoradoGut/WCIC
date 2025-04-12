const Topbar = () => {
    return (
        <div style={{
            height: "80px",
            background: "#f5d0fe",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 1rem",
            borderBottom: "1px solid #ccc"
        }}>
            <h1 style={{ fontSize: "1.5rem" }}>What Can I Cook?</h1>
            <div>M</div>
        </div>
    );
};

export default Topbar;