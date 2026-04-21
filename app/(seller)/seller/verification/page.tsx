'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle, AlertCircle, Upload, FileText } from 'lucide-react';

export default function VerificationPage() {
  const [isIDVerified, setIsIDVerified] = useState(false);
  const [isBusinessVerified, setIsBusinessVerified] = useState(true);
  const [isBankVerified, setIsBankVerified] = useState(false);

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Account Verification</h1>
        <p className="text-sm text-muted-foreground">Complete your verification to unlock all features</p>
      </div>

      {/* Status Alert */}
      <Alert className="border-blue-200 bg-blue-50">
        <AlertCircle className="h-4 w-4 text-blue-600" />
        <AlertTitle className="text-blue-900">Verification Status</AlertTitle>
        <AlertDescription className="text-blue-800">
          You have completed 1 out of 3 verifications. Complete all to get the Verified Seller badge.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="personal" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="personal">Personal ID</TabsTrigger>
          <TabsTrigger value="business">Business</TabsTrigger>
          <TabsTrigger value="bank">Bank Account</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>Personal Identification</CardTitle>
                  <CardDescription>Verify your identity with a government-issued ID</CardDescription>
                </div>
                {isIDVerified && (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {!isIDVerified ? (
                <>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium">Full Name</label>
                      <Input
                        placeholder="As shown on your ID"
                        className="mt-1"
                        defaultValue="Tendai Musiyarwanzi"
                      />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="text-sm font-medium">ID Type</label>
                        <select className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm">
                          <option>National ID</option>
                          <option>Passport</option>
                          <option>Driver&apos;s License</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium">ID Number</label>
                        <Input
                          placeholder="Your ID number"
                          className="mt-1"
                          defaultValue="123456789"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-sm font-medium">Upload ID Documents</p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground p-6">
                        <div className="text-center">
                          <Upload className="mx-auto h-6 w-6 text-muted-foreground" />
                          <p className="mt-2 text-sm text-muted-foreground">
                            Upload front side
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground p-6">
                        <div className="text-center">
                          <Upload className="mx-auto h-6 w-6 text-muted-foreground" />
                          <p className="mt-2 text-sm text-muted-foreground">
                            Upload back side
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={() => setIsIDVerified(true)}
                    className="w-full"
                  >
                    Submit for Verification
                  </Button>
                </>
              ) : (
                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertTitle className="text-green-900">Verified</AlertTitle>
                  <AlertDescription className="text-green-800">
                    Your personal identification has been verified on{' '}
                    <span className="font-semibold">April 15, 2024</span>
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="business" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>Business Information</CardTitle>
                  <CardDescription>Verify your farm or business details</CardDescription>
                </div>
                {isBusinessVerified && (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {!isBusinessVerified ? (
                <>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium">Business Name</label>
                      <Input
                        placeholder="Your farm or business name"
                        className="mt-1"
                      />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="text-sm font-medium">Registration Number</label>
                        <Input
                          placeholder="Optional"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Years in Business</label>
                        <Input
                          type="number"
                          placeholder="e.g., 5"
                          className="mt-1"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Business Address</label>
                      <Input
                        placeholder="Full address"
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-sm font-medium">Upload Business Documents</p>
                    <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground p-6">
                      <div className="text-center">
                        <FileText className="mx-auto h-6 w-6 text-muted-foreground" />
                        <p className="mt-2 text-sm text-muted-foreground">
                          Upload registration certificate or license
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full">Submit for Verification</Button>
                </>
              ) : (
                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertTitle className="text-green-900">Verified</AlertTitle>
                  <AlertDescription className="text-green-800">
                    Your business information has been verified on{' '}
                    <span className="font-semibold">April 15, 2024</span>
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bank" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>Bank Account</CardTitle>
                  <CardDescription>Add your bank account for payouts</CardDescription>
                </div>
                {isBankVerified && (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {!isBankVerified ? (
                <>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium">Bank Name</label>
                      <select className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm">
                        <option>Select your bank</option>
                        <option>ZB Bank</option>
                        <option>Econet Bank</option>
                        <option>Stanbic Bank</option>
                        <option>FBC Bank</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="text-sm font-medium">Account Name</label>
                        <Input
                          placeholder="As shown on bank account"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Account Number</label>
                        <Input
                          placeholder="Your account number"
                          className="mt-1"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Branch Code (Optional)</label>
                      <Input
                        placeholder="Branch code"
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <Alert className="border-amber-200 bg-amber-50">
                    <AlertCircle className="h-4 w-4 text-amber-600" />
                    <AlertTitle className="text-amber-900">Important</AlertTitle>
                    <AlertDescription className="text-amber-800">
                      Make sure the account name matches your verified identity. We will verify your account with a small deposit.
                    </AlertDescription>
                  </Alert>

                  <Button className="w-full">Submit for Verification</Button>
                </>
              ) : (
                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertTitle className="text-green-900">Verified</AlertTitle>
                  <AlertDescription className="text-green-800">
                    Your bank account has been verified. Payouts will go to this account.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
