import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { inject } from "@angular/core";
import {Cidade} from "../../../interfaces/Cidade";
import {CidadeService} from "../../../services/cidade.service";

export const cidadeResolver: ResolveFn<Cidade> =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    return inject(CidadeService).findById(route.paramMap.get('id')!);
  }
