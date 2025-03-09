import { ArrowDownRight, ArrowUpRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface StatsCardProps {
  title: string
  value: string
  description: string
  trend?: number
  trendType?: "positive" | "negative" | "neutral"
}

export function StatsCard({
  title,
  value,
  description,
  trend,
  trendType = trend && trend > 0 ? "positive" : "negative",
}: StatsCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
        {trend !== undefined && (
          <div
            className={cn(
              "mt-2 flex items-center text-xs",
              trendType === "positive" && "text-success",
              trendType === "negative" && "text-destructive",
            )}
          >
            {trendType === "positive" ? (
              <ArrowUpRight className="mr-1 h-3 w-3" />
            ) : (
              <ArrowDownRight className="mr-1 h-3 w-3" />
            )}
            {Math.abs(trend)}%
          </div>
        )}
      </CardContent>
    </Card>
  )
}

