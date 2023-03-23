import * as sjcl from "sjcl";
import { environment } from "src/environments/environment";

export class AppCrypto {
    static Encrypt(jsonData: any): string {
        const key = environment.cryptoPassPhrase;
        const cipherText = sjcl.encrypt(key, JSON.stringify(jsonData));
        return (<any>cipherText) as string;
    }

    static Decrypt<T>(cipherText: string): T | undefined {
        const key = environment.cryptoPassPhrase;
        const decrypted = sjcl.decrypt(key, cipherText);
        return decrypted && <T>JSON.parse(decrypted) || undefined;
    }
}
