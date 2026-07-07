import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface BusinessHoursProps {
  businessHours?: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
    [key: string]: string;
  };
}

export function BusinessHours({ businessHours }: BusinessHoursProps) {
  if (!businessHours) return null;

  const daysOfWeek = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

  // Logic to determine if the vendor is open right now
  const isOpenNow = () => {
    try {
      const now = new Date();
      const currentDayName = daysOfWeek[now.getDay()];
      const hoursToday = businessHours[currentDayName];

      if (!hoursToday || hoursToday.toLowerCase() === "closed") return false;

      // Parse hours string e.g., "9:00 AM - 6:00 PM"
      const [startStr, endStr] = hoursToday.split(" - ");
      if (!startStr || !endStr) return false;

      const parseTimeString = (timeStr: string) => {
        const [time, modifier] = timeStr.split(" ");
        let [hours, minutes] = time.split(":").map(Number);
        if (modifier === "PM" && hours < 12) hours += 12;
        if (modifier === "AM" && hours === 12) hours = 0;
        
        const d = new Date();
        d.setHours(hours, minutes, 0, 0);
        return d;
      };

      const startTime = parseTimeString(startStr);
      const endTime = parseTimeString(endStr);

      return now >= startTime && now <= endTime;
    } catch (e) {
      return false; // Graceful fallback if format string changes
    }
  };

  const isCurrentlyOpen = isOpenNow();

  return (
    <Card className="rounded-2xl border border-border bg-surface shadow-soft">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="font-display text-lg text-ink">Business Hours</CardTitle>
        {isCurrentlyOpen && (
          <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white border-none font-medium">
            Open Now
          </Badge>
        )}
      </CardHeader>
      <CardContent className="space-y-2.5 text-sm">
        {daysOfWeek.map((day) => {
          const formattedDay = day.charAt(0).toUpperCase() + day.slice(1);
          const timeSlot = businessHours[day];
          
          return (
            <div key={day}>
              <div className="flex justify-between items-center py-1">
                <span className="capitalize text-muted-foreground font-medium">{formattedDay}</span>
                <span className={`text-ink ${timeSlot === "Closed" ? "text-muted-foreground/60" : ""}`}>
                  {timeSlot}
                </span>
              </div>
              {day !== "saturday" && <Separator className="opacity-40" />}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}