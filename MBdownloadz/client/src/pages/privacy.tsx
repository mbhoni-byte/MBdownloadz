import { Card, CardContent } from "@/components/ui/card";

export default function Privacy() {
  return (
    <div className="page-content">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-primary mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground">Last updated: December 2024</p>
          </div>

          <Card className="shadow-xl">
            <CardContent className="p-8">
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-primary mb-4">1. Information We Collect</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We collect minimal information necessary to provide our service:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Video URLs you submit for downloading</li>
                    <li>• Basic technical information (IP address, browser type)</li>
                    <li>• Usage analytics to improve our service</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-primary mb-4">2. How We Use Your Information</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We use collected information to:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Process your video download requests</li>
                    <li>• Improve our service quality and performance</li>
                    <li>• Prevent abuse and ensure security</li>
                    <li>• Comply with legal obligations</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-primary mb-4">3. Data Storage and Security</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We implement appropriate security measures to protect your information. Downloaded videos are temporarily stored on our servers and automatically deleted after processing.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-primary mb-4">4. Third-Party Services</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We may use third-party services for analytics and advertising. These services have their own privacy policies, and we encourage you to review them.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-primary mb-4">5. Cookies</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We use cookies to enhance your experience and analyze usage patterns. You can disable cookies in your browser settings, but this may affect functionality.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-primary mb-4">6. Your Rights</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    You have the right to:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Access your personal information</li>
                    <li>• Request correction of inaccurate data</li>
                    <li>• Request deletion of your data</li>
                    <li>• Opt-out of certain data processing</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-primary mb-4">7. Changes to Privacy Policy</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We may update this privacy policy from time to time. We will notify you of any significant changes.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-primary mb-4">8. Contact Us</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    If you have any questions about this privacy policy, please contact us at privacy@mbdownloadz.com
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
