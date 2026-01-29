import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Lỗi render:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "2rem", fontFamily: "sans-serif", maxWidth: 600 }}>
          <h2 style={{ color: "#c00" }}>Có lỗi xảy ra</h2>
          <p>{this.state.error?.message}</p>
          <p style={{ fontSize: 14, color: "#666" }}>
            Mở DevTools (F12) → tab Console để xem chi tiết. Đảm bảo backend đang chạy tại localhost:3000.
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}
