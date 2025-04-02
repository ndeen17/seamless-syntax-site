import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Mail } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Helmet } from "react-helmet";
import { authService } from "@/services/authService";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(1); // 1: Email, 2: Verification Code
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleForgotPassword = async (email: string) => {
    setIsLoading(true);
    try {
      await authService.forgotPassword({ email });
      toast({
        title: "Success",
        description: "Verification code sent to your email.",
        variant: "success",
      });
      setStep(2);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to send verification code",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async (email: string, code: string) => {
    setIsLoading(true);
    try {
      await authService.approveForgotPassword({ email, code });
      toast({
        title: "Success",
        description: "Code verified. You can now reset your password.",
        variant: "success",
      });
      navigate("/login");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Invalid or expired code",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (step === 1) {
      if (!email) {
        toast({
          title: "Error",
          description: "Please enter your email",
          variant: "destructive",
        });
        return;
      }
      await handleForgotPassword(email);
    } else {
      if (!verificationCode) {
        toast({
          title: "Error",
          description: "Please enter the verification code",
          variant: "destructive",
        });
        return;
      }
      await handleVerifyCode(email, verificationCode);
    }
  };

  return (
    <>
      <Helmet>
        <title>Forgot Password | AccsMarket - Social Media Accounts Store</title>
      </Helmet>
      <AuthLayout>
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Forgot Your Password?
          </h1>
          <p className="text-sm text-muted-foreground">
            {step === 1
              ? "Enter your email address to receive a verification code"
              : "Enter the verification code sent to your email"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {step === 1 ? (
            <div className="space-y-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Mail className="h-4 w-4 text-gray-500" />
                </div>
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Verification Code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                required
              />
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading
              ? "Processing..."
              : step === 1
              ? "Send Reset Link"
              : "Verify Code"}
          </Button>
        </form>

        <div className="text-center text-sm mt-4">
          Remember your password?{" "}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate("/login");
            }}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Back to Login
          </a>
        </div>
      </AuthLayout>
    </>
  );
};

export default ForgotPassword;
