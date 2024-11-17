import { toast } from "@/hooks/use-toast";

export const copyToClipboard = (text: string): void => {
  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Text copied to clipboard successfully!!");
        toast({
          title: "Text copied to clipboard successfully",
        });
      })
      .catch((err) => {
        console.log("Failed to copy text:", err);
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        });
      });
  }
};
