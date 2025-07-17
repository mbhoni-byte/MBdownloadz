import { Card, CardContent } from "@/components/ui/card";

export default function Terms() {
  return (
    <div className="page-content">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-primary mb-4">Terms of Service</h1>
            <p className="text-muted-foreground">Last updated: December 2024</p>
          </div>

          <Card className="shadow-xl">
            <CardContent className="p-8">
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-primary mb-4">1. Acceptance of Terms</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    By using MBdownloadz, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-primary mb-4">2. Service Description</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    MBdownloadz is a free online video downloading service that allows users to download videos from various platforms. We provide this service "as is" without warranties of any kind.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-primary mb-4">3. User Responsibilities</h2>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• You must comply with all applicable laws and regulations</li>
                    <li>• You are responsible for respecting copyright and intellectual property rights</li>
                    <li>• You must not use our service for any illegal or unauthorized purpose</li>
                    <li>• You must not attempt to harm or disrupt our service</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-primary mb-4">4. Prohibited Uses</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    You may not use our service to:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Download copyrighted content without permission</li>
                    <li>• Violate any platform's terms of service</li>
                    <li>• Distribute malware or harmful content</li>
                    <li>• Engage in any fraudulent activity</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-primary mb-4">5. Disclaimers</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We provide our service "as is" and make no warranties about its availability, accuracy, or reliability. We are not responsible for any damages resulting from your use of our service.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-primary mb-4">6. Limitation of Liability</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    In no event shall MBdownloadz be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use of our service.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-primary mb-4">7. Changes to Terms</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We reserve the right to modify these terms at any time. Continued use of our service constitutes acceptance of the modified terms.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
