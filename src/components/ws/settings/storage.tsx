import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const StorageSettings = () => {
  return (
    <div>
      <Card className=" border-none shadow-none">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground leading-3">
            Bon à savoir
          </CardTitle>
          <CardDescription>
            Vous êtes libre de choisir où stocker vos images. Il suffit de
            modifier l&apos;action{" "}
            <pre className="inline text-yellow-400">
              <code>
                uploadFile(<span className=" text-blue-400">file</span>:
                <span className=" text-green-400">File</span>)
              </code>
            </pre>{" "}
            dans le code source et de retourner l&apos;URL comme un{" "}
            <pre className="inline text-green-400">
              <code>string</code>
            </pre>{" "}
            puis configurer dans next.config.js{" "}
            <pre className="inline text-blue-400">
              <code>hostname</code>
            </pre>{" "}
            pour une meilleure performance des images
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <p className=" text-sm text-muted-foreground">
              Pour l&apos;instant, il est préférable de copier-coller
              l&apos;adresse URL dans les champs des formulaires qui exigent une
              image. Notez que vous pouvez actuellement téléverser les images
              gratuitement sur{" "}
              <a
                href="https://imgbb.com/"
                target="_blank"
                className=" text-blue-400"
              >
                imgbb
              </a>
              , mais avec des performances limitées.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
