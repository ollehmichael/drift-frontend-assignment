import { Progress } from "@/components/ui/progress";
import { Asset } from "@/lib/types";
import { formatCurrency, getAssetValue } from "@/lib/utils";

interface AssetsListProps {
  assets: Asset[];
}

export function AssetsList({ assets }: AssetsListProps) {
  const totalValue = assets.reduce(
    (sum, asset) => sum + getAssetValue(asset.balance),
    0
  );

  return (
    <div className="space-y-4">
      <div className="text-sm font-medium">Assets Breakdown</div>
      <div className="space-y-3">
        {assets.map((asset) => {
          const percentage = (getAssetValue(asset.balance) / totalValue) * 100;
          return (
            <div key={asset.type} className="space-y-1">
              <div className="flex justify-between text-sm">
                <div className="flex items-center">
                  {asset.icon && <span className="mr-2">{asset.icon}</span>}
                  <span>
                    {asset.balance.toFixed(2)} {asset.type}
                  </span>
                </div>
                <span>{formatCurrency(getAssetValue(asset.balance))}</span>
              </div>
              <Progress value={percentage} className="h-2" />
              <div className="text-xs text-muted-foreground">
                {percentage.toFixed(1)}%
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
