import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { 
  Store, 
  MapPin, 
  Globe, 
  Mail, 
  Phone, 
  Calendar,
  ExternalLink,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Edit,
  Save,
  X
} from "lucide-react";
import { useEcommerce } from "@/context/EcommerceContext";
import { useToast } from "@/hooks/use-toast";

const storeProfileSchema = z.object({
  name: z.string().trim().min(1, "Store name is required").max(100, "Name must be less than 100 characters"),
  description: z.string().trim().min(10, "Description must be at least 10 characters").max(500, "Description must be less than 500 characters"),
  url: z.string().trim().url("Must be a valid URL").max(255, "URL must be less than 255 characters"),
  email: z.string().trim().email("Must be a valid email").max(255, "Email must be less than 255 characters"),
  phone: z.string().trim().min(1, "Phone number is required").max(20, "Phone number must be less than 20 characters"),
  location: z.string().trim().min(1, "Location is required").max(100, "Location must be less than 100 characters"),
  founded: z.string().trim().min(4, "Founded year is required").max(4, "Must be a valid year"),
  category: z.string().trim().min(1, "Category is required").max(100, "Category must be less than 100 characters"),
  facebook: z.string().trim().url("Must be a valid URL").or(z.literal("")).optional(),
  twitter: z.string().trim().url("Must be a valid URL").or(z.literal("")).optional(),
  instagram: z.string().trim().url("Must be a valid URL").or(z.literal("")).optional(),
  linkedin: z.string().trim().url("Must be a valid URL").or(z.literal("")).optional(),
});

type StoreProfileFormData = z.infer<typeof storeProfileSchema>;

const StoreProfile = () => {
  const { storeProfile, updateStoreProfile, metrics } = useEcommerce();
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  const form = useForm<StoreProfileFormData>({
    resolver: zodResolver(storeProfileSchema),
    defaultValues: {
      name: storeProfile.name,
      description: storeProfile.description,
      url: storeProfile.url,
      email: storeProfile.email,
      phone: storeProfile.phone,
      location: storeProfile.location,
      founded: storeProfile.founded,
      category: storeProfile.category,
      facebook: storeProfile.socialMedia.facebook,
      twitter: storeProfile.socialMedia.twitter,
      instagram: storeProfile.socialMedia.instagram,
      linkedin: storeProfile.socialMedia.linkedin,
    },
  });

  const onSubmit = (data: StoreProfileFormData) => {
    updateStoreProfile({
      name: data.name,
      description: data.description,
      url: data.url,
      email: data.email,
      phone: data.phone,
      location: data.location,
      founded: data.founded,
      category: data.category,
      socialMedia: {
        facebook: data.facebook || "",
        twitter: data.twitter || "",
        instagram: data.instagram || "",
        linkedin: data.linkedin || "",
      },
    });
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your store profile has been successfully updated.",
    });
  };

  const handleCancel = () => {
    form.reset();
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header Card */}
        <Card className="p-8 mb-6">
          <div className="flex justify-end mb-4">
            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button onClick={form.handleSubmit(onSubmit)} size="sm">
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
                <Button onClick={handleCancel} variant="outline" size="sm">
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            )}
          </div>

          {!isEditing ? (
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
              <Avatar className="h-24 w-24">
                <AvatarImage src="" />
                <AvatarFallback className="bg-accent text-accent-foreground text-2xl font-bold">
                  {storeProfile.name.substring(0, 2)}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-foreground">{storeProfile.name}</h1>
                  <Badge variant="secondary" className="text-sm">
                    {storeProfile.category}
                  </Badge>
                </div>
                <p className="text-muted-foreground mb-4">{storeProfile.description}</p>
                
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{storeProfile.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Since {storeProfile.founded}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Store className="h-4 w-4" />
                    <span>{metrics.productCount} Active Products</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Form {...form}>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Store Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} rows={3} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="founded"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Founded Year</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="2019" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </form>
            </Form>
          )}
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="p-6">
            <div className="text-sm text-muted-foreground mb-1">Store Rating</div>
            <div className="text-3xl font-bold text-foreground">{metrics.avgRating}</div>
            <div className="text-sm text-success mt-1">⭐ Excellent</div>
          </Card>
          
          <Card className="p-6">
            <div className="text-sm text-muted-foreground mb-1">Monthly Revenue</div>
            <div className="text-3xl font-bold text-foreground">${metrics.monthlyRevenue.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground mt-1">Current month</div>
          </Card>
          
          <Card className="p-6">
            <div className="text-sm text-muted-foreground mb-1">Active Listings</div>
            <div className="text-3xl font-bold text-foreground">{metrics.productCount}</div>
            <div className="text-sm text-muted-foreground mt-1">Products available</div>
          </Card>
        </div>

        {/* Contact Information */}
        <Card className="p-8 mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-6">Contact Information</h2>
          
          {!isEditing ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-start gap-3 mb-4">
                  <Globe className="h-5 w-5 text-accent mt-1" />
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Store Website</div>
                    <a 
                      href={storeProfile.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-accent hover:underline flex items-center gap-1"
                    >
                      {storeProfile.url}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 mb-4">
                  <Mail className="h-5 w-5 text-accent mt-1" />
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Email</div>
                    <a 
                      href={`mailto:${storeProfile.email}`}
                      className="text-foreground hover:text-accent"
                    >
                      {storeProfile.email}
                    </a>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="flex items-start gap-3 mb-4">
                  <Phone className="h-5 w-5 text-accent mt-1" />
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Phone</div>
                    <a 
                      href={`tel:${storeProfile.phone}`}
                      className="text-foreground hover:text-accent"
                    >
                      {storeProfile.phone}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-accent mt-1" />
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Location</div>
                    <div className="text-foreground">{storeProfile.location}</div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Form {...form}>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Store Website</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="https://yourstore.com" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} type="email" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input {...field} type="tel" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </form>
            </Form>
          )}
        </Card>

        {/* Social Media */}
        <Card className="p-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Connect With Us</h2>
          
          {!isEditing ? (
            <div className="flex flex-wrap gap-3">
              {storeProfile.socialMedia.facebook && (
                <Button 
                  variant="outline" 
                  size="lg"
                  className="flex items-center gap-2"
                  onClick={() => window.open(storeProfile.socialMedia.facebook, '_blank')}
                >
                  <Facebook className="h-5 w-5" />
                  Facebook
                </Button>
              )}
              
              {storeProfile.socialMedia.twitter && (
                <Button 
                  variant="outline" 
                  size="lg"
                  className="flex items-center gap-2"
                  onClick={() => window.open(storeProfile.socialMedia.twitter, '_blank')}
                >
                  <Twitter className="h-5 w-5" />
                  Twitter
                </Button>
              )}
              
              {storeProfile.socialMedia.instagram && (
                <Button 
                  variant="outline" 
                  size="lg"
                  className="flex items-center gap-2"
                  onClick={() => window.open(storeProfile.socialMedia.instagram, '_blank')}
                >
                  <Instagram className="h-5 w-5" />
                  Instagram
                </Button>
              )}
              
              {storeProfile.socialMedia.linkedin && (
                <Button 
                  variant="outline" 
                  size="lg"
                  className="flex items-center gap-2"
                  onClick={() => window.open(storeProfile.socialMedia.linkedin, '_blank')}
                >
                  <Linkedin className="h-5 w-5" />
                  LinkedIn
                </Button>
              )}
            </div>
          ) : (
            <Form {...form}>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="facebook"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Facebook URL</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="https://facebook.com/yourstore" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="twitter"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Twitter URL</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="https://twitter.com/yourstore" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="instagram"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Instagram URL</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="https://instagram.com/yourstore" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="linkedin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>LinkedIn URL</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="https://linkedin.com/company/yourstore" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </form>
            </Form>
          )}
        </Card>
      </div>
    </div>
  );
};

export default StoreProfile;
