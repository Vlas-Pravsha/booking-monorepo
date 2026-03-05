"use client";

import { Clock, Minus, Plus, Timer, Trash2, Users } from "lucide-react";
import * as React from "react";

import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";

import type { OnboardingData } from "../types";

const SEAT_DURATIONS = [60, 90, 120, 150, 180];

function getSeatsLabel(seats: number): string {
  if (seats === 1) {
    return "місце";
  }
  if (seats < 5) {
    return "місця";
  }
  return "місць";
}

interface ScheduleStepProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
}

export function ScheduleStep({ data, updateData }: ScheduleStepProps) {
  const addTable = () => {
    updateData({
      tables: [
        ...data.tables,
        { name: `Стіл ${data.tables.length + 1}`, seats: 2 },
      ],
    });
  };

  const removeTable = (index: number) => {
    updateData({
      tables: data.tables.filter(
        (_: OnboardingData["tables"][number], i: number) => i !== index
      ),
    });
  };

  const updateTable = (index: number, seats: number) => {
    const newTables = [...data.tables];
    const existingTable = newTables[index];
    if (existingTable) {
      newTables[index] = { ...existingTable, seats };
      updateData({ tables: newTables });
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-4">
          <Clock className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-3xl font-bold mb-2">Налаштування залу</h2>
        <p className="text-muted-foreground">
          Визначте час роботи та конфігурацію столів
        </p>
      </div>

      <div className="max-w-xl mx-auto space-y-6">
        <div className="grid sm:grid-cols-2 gap-6">
          <Card className="border-none bg-muted/30 flex flex-col">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Години роботи
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-center space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label
                    htmlFor="openingTime"
                    className="text-xs uppercase tracking-wider text-muted-foreground font-semibold"
                  >
                    Відкриття
                  </Label>
                  <Input
                    id="openingTime"
                    type="time"
                    className="bg-background/50 h-11"
                    value={data.openingTime}
                    onChange={(e) =>
                      updateData({ openingTime: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-1.5">
                  <Label
                    htmlFor="closingTime"
                    className="text-xs uppercase tracking-wider text-muted-foreground font-semibold"
                  >
                    Закриття
                  </Label>
                  <Input
                    id="closingTime"
                    type="time"
                    className="bg-background/50 h-11"
                    value={data.closingTime}
                    onChange={(e) =>
                      updateData({ closingTime: e.target.value })
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none bg-muted/30 flex flex-col">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Timer className="w-5 h-5 text-primary" />
                Тривалість візиту
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-center">
              <div className="grid grid-cols-3 gap-2">
                {SEAT_DURATIONS.map((duration) => (
                  <Button
                    key={duration}
                    variant={
                      data.averageDuration === duration ? "default" : "outline"
                    }
                    size="sm"
                    type="button"
                    onClick={() => updateData({ averageDuration: duration })}
                    className={cn(
                      "h-10 transition-all px-2",
                      data.averageDuration === duration
                        ? "shadow-md shadow-primary/20"
                        : "bg-background/50"
                    )}
                  >
                    {duration}
                    <span className="ml-1 text-[10px] opacity-70">хв</span>
                  </Button>
                ))}
              </div>
              <p className="text-[11px] text-muted-foreground mt-3 leading-tight italic">
                * Середній час бронювання одного столу
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-none bg-muted/30">
          <CardHeader className="pb-3 flex flex-row items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Столи та місця
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              type="button"
              className="bg-background/50 h-8"
              onClick={addTable}
            >
              <Plus className="w-4 h-4 mr-1" />
              Додати стіл
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[300px] overflow-y-auto pr-2">
              {data.tables.map(
                (table: OnboardingData["tables"][number], index: number) => (
                  <div
                    key={table.name}
                    className="flex items-center justify-between gap-3 p-3 rounded-xl bg-background/60 border border-transparent hover:border-primary/20 transition-all"
                  >
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-tight">
                        {table.name}
                      </span>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <Users className="w-3.5 h-3.5 text-primary/70" />
                        <span className="text-sm font-bold">
                          {table.seats} {getSeatsLabel(table.seats)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center bg-muted/50 rounded-lg p-0.5 border">
                        <Button
                          variant="ghost"
                          size="icon"
                          type="button"
                          className="h-7 w-7 rounded-md hover:bg-background"
                          onClick={() =>
                            updateTable(index, Math.max(1, table.seats - 1))
                          }
                          disabled={table.seats <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          type="button"
                          className="h-7 w-7 rounded-md hover:bg-background"
                          onClick={() =>
                            updateTable(index, Math.min(20, table.seats + 1))
                          }
                          disabled={table.seats >= 20}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        type="button"
                        className="h-8 w-8 text-muted-foreground/50 hover:text-destructive hover:bg-destructive/10 transition-colors"
                        onClick={() => removeTable(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )
              )}
            </div>
            {data.tables.length === 0 && (
              <div className="text-center py-8 border-2 border-dashed rounded-xl border-muted-foreground/20">
                <Users className="w-8 h-8 mx-auto text-muted-foreground/30 mb-2" />
                <p className="text-sm text-muted-foreground">
                  Ви ще не додали жодного столу
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
